SELECT ROUND(100.0*AVG(order_date=customer_pref_delivery_date),2) AS immediate_percentage FROM Delivery d WHERE order_date=(SELECT MIN(order_date) FROM Delivery f WHERE f.customer_id=d.customer_id);
