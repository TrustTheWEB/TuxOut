CREATE VIEW vistaProducto AS
SELECT 
    p.idProducto, 
    p.nombre, 
    p.descripcion, 
    p.precio, 
    p.stock, 
    p.estado,
    p.marca,
    IFNULL(SUM(cont.cantidad), 0) AS cantidadVendida,
    IFNULL(MAX(d.porcentaje), 0) AS descuento,
    IFNULL(AVG(c.calificacion), 0) AS promedioCalificacion
FROM 
    producto p
LEFT JOIN 
    comenta c ON p.idProducto = c.idProducto
LEFT JOIN 
    contiene cont ON p.idProducto = cont.idProducto
LEFT JOIN 
    tiene t ON p.idProducto = t.idProducto
LEFT JOIN 
    descuento d ON t.idDescuento = d.idDescuento 
    AND CURDATE() BETWEEN d.fechaInicio AND d.fechaFin
WHERE 
    p.oculto = 0
    AND p.stock > 0
GROUP BY 
    p.idProducto;