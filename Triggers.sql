delimiter $$
create trigger stockProduct after insert on order_products for each row
begin
	update products set stock = stock - new.quantity where new.product_id = id;
end $$
delimiter ;

delimiter $$
create trigger cancelOrderProduct after delete on order_products for each row
begin
	update products set stock = stock + old.quantity where old.product_id = id;
end $$
delimiter ;

delimiter $$
create trigger cartUpdate after update on products for each row
begin
	if( new.stock = 0) then
		delete from cart_products where product_id = new.id;
	elseif (new.stock <=5) then
		update cart_product set quantity = 1 where product_id = new.id;
	end if;
end $$
delimiter ;



