package ma.akenord.v1.controller;

import lombok.AllArgsConstructor;
import ma.akenord.v1.request.EmailRequest;
import ma.akenord.v1.service.PdfGenerationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;

@RestController
@AllArgsConstructor
public class EmailController {
    private final JavaMailSender javaMailSender;
    private final PdfGenerationService pdfGenerationService;

    @PostMapping("/send-email")
    public ResponseEntity<String> sendEmail(@RequestBody EmailRequest emailRequest) {
        try {
            String recipientEmail = emailRequest.getClientEmail(); // Replace with the client's email
            String emailSubject = "Invoice Akenord";

            // Access emailContent and orderData as a generic Object
            byte[] pdfBlob = emailRequest.getEmailContent();


            // Create a MimeMessagePreparator to send the email
            MimeMessagePreparator messagePreparator = mimeMessage -> {
                MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, true);
                messageHelper.setTo(recipientEmail);
                messageHelper.setSubject(emailSubject);
                messageHelper.setText("This is your Invoice");
                messageHelper.addAttachment("invoice.pdf", new ByteArrayResource(pdfBlob), "application/pdf");

            };

            javaMailSender.send(messagePreparator);

            return ResponseEntity.ok("Email sent successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send email: " + e.getMessage());
        }
    }
}
