package ma.akenord.v1.service;

import lombok.RequiredArgsConstructor;
import ma.akenord.v1.entity.StmpConfig;
import ma.akenord.v1.repository.StmpConfigRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class SmtpConfigService {

    @Autowired
    private final StmpConfigRepository smtpConfigRepository;

    public StmpConfig loadSmtpConfigForAdmin(){
        StmpConfig config = smtpConfigRepository.findAll().get(0);
        StmpConfig smtpConfig = new StmpConfig();

        if(config != null){
            smtpConfig.setHost(config.getHost());
            smtpConfig.setPort(config.getPort());
            smtpConfig.setUsername(config.getUsername());
            smtpConfig.setPassword(config.getPassword());
        }


        return smtpConfig;

    }
}
