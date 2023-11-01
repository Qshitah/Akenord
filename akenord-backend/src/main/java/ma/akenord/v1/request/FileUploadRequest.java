package ma.akenord.v1.request;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class FileUploadRequest {
    private List<MultipartFile> files;

    public List<MultipartFile> getFiles() {
        return files;
    }

    public void setFiles(List<MultipartFile> files) {
        this.files = files;
    }
}
