package ma.akenord.v1;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
//@ComponentScan(basePackages = "ma.akenord.v1.jwt")
public class AkenordApplication {

	public static void main(String[] args) {
		SpringApplication.run(AkenordApplication.class, args);
	}

}
