package ma.akenord.v1.repository;

import ma.akenord.v1.entity.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CouponRepository extends JpaRepository<Coupon,Long> {

    Coupon findByCode(String code);
}
