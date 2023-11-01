package ma.akenord.v1.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.util.StringUtils;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api")
public class FileUploadController {
    private static final String uploadDir = "../akenordV2/public/uploads"; // Change this to your desired public directory

    @PostMapping("/upload")
    public String uploadFiles(@RequestParam("productName") String productName,@RequestParam("files") MultipartFile[] files) {
        try {
            String productFolder = StringUtils.cleanPath(productName);
            Path uploadPath = Paths.get(uploadDir, productFolder);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            for (MultipartFile file : files) {
                String fileName = StringUtils.cleanPath(file.getOriginalFilename());
                Path filePath = uploadPath.resolve(fileName);
                Files.copy(file.getInputStream(), filePath);
            }

            return "Files uploaded successfully for product: " + productName;
        } catch (IOException e) {
            e.printStackTrace();
            return "Error uploading files";
        }
    }
}
