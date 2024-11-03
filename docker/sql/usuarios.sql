-- El usuario backoffice se crea junto al contenedor del docker
-- CREATE USER 'backoffice'@'%' IDENTIFIED BY 'backoffice';
CREATE USER 'usuario'@'%' IDENTIFIED BY 'usuario';
CREATE USER 'proveedor'@'%' IDENTIFIED BY 'proveedor';

GRANT SELECT, INSERT, UPDATE on tuxout.usuario to usuario;
GRANT SELECT, INSERT, UPDATE, DELETE on tuxout.usuario to backoffice;

GRANT SELECT, INSERT, UPDATE on tuxout.empresa to proveedor;
GRANT SELECT, INSERT, UPDATE, DELETE on tuxout.empresa to backoffice;

GRANT SELECT, UPDATE on tuxout.producto to usuario; 
GRANT SELECT, INSERT, UPDATE, DELETE  on tuxout.producto to proveedor;
GRANT SELECT, INSERT, UPDATE, DELETE on tuxout.producto to backoffice;

GRANT SELECT, INSERT on tuxout.pedido to usuario;
GRANT SELECT on tuxout.pedido to proveedor;
GRANT SELECT, INSERT, UPDATE, DELETE on tuxout.pedido to backoffice;

GRANT SELECT, INSERT on tuxout.contiene to usuario;
GRANT SELECT, UPDATE on tuxout.contiene to proveedor;
GRANT SELECT, INSERT, UPDATE, DELETE on tuxout.contiene to backoffice;

GRANT SELECT on tuxout.descuento to usuario;
GRANT SELECT, INSERT, UPDATE on tuxout.descuento to proveedor;
GRANT SELECT, INSERT, UPDATE, DELETE on tuxout.descuento to backoffice;

GRANT INSERT on tuxout.tiene to usuario;
GRANT INSERT, INSERT, UPDATE, DELETE on tuxout.tiene to proveedor;
GRANT SELECT, INSERT, UPDATE, DELETE on tuxout.tiene to backoffice;

GRANT SELECT, INSERT, UPDATE on tuxout.visita to usuario;
GRANT SELECT on tuxout.visita to proveedor;
GRANT INSERT, UPDATE, DELETE on tuxout.visita to backoffice;

GRANT SELECT, INSERT, UPDATE, DELETE on tuxout.favorito to usuario;
GRANT SELECT, INSERT, UPDATE, DELETE on tuxout.favorito to backoffice;

GRANT SELECT on tuxout.categoria to usuario;
GRANT SELECT on tuxout.categoria to proveedor;
GRANT SELECT, INSERT, UPDATE, DELETE on tuxout.categoria to backoffice;

GRANT SELECT on tuxout.categoriza to usuario;
GRANT SELECT, INSERT, UPDATE, DELETE on tuxout.categoriza to proveedor;
GRANT SELECT, INSERT, UPDATE, DELETE on tuxout.categoriza to backoffice;

GRANT SELECT on tuxout.caracteristica to usuario;
GRANT SELECT, INSERT, UPDATE, DELETE on tuxout.caracteristica to proveedor;
GRANT SELECT, INSERT, UPDATE, DELETE on tuxout.caracteristica to backoffice;

GRANT SELECT, INSERT, UPDATE, DELETE on tuxout.direccion to usuario;
GRANT SELECT, INSERT, UPDATE, DELETE on tuxout.direccion to backoffice;

GRANT SELECT, INSERT, UPDATE, DELETE on tuxout.comenta to usuario;
GRANT SELECT, INSERT, DELETE on tuxout.comenta to proveedor;
GRANT SELECT, INSERT, UPDATE, INSERT on tuxout.comenta to backoffice;

GRANT SELECT, INSERT, UPDATE, DELETE on tuxout.carrito to usuario;
GRANT SELECT on tuxout.carrito to proveedor;
GRANT SELECT, INSERT, UPDATE, DELETE on tuxout.carrito to backoffice;

GRANT SELECT ON tuxout.vistacarritopreview TO usuario;
GRANT SELECT ON tuxout.vistacarritopreview TO proveedor;
GRANT SELECT, INSERT, UPDATE, DELETE ON tuxout.vistacarritopreview TO backoffice;

GRANT SELECT ON tuxout.vistadetalles TO usuario;
GRANT SELECT ON tuxout.vistadetalles TO proveedor;
GRANT SELECT, INSERT, UPDATE, DELETE ON tuxout.vistadetalles TO backoffice;

GRANT SELECT ON tuxout.vistaestadisticasmes TO usuario;
GRANT SELECT ON tuxout.vistaestadisticasmes TO proveedor;
GRANT SELECT, INSERT, UPDATE, DELETE ON tuxout.vistaestadisticasmes TO backoffice;

GRANT SELECT ON tuxout.vistapedidomonto TO usuario;
GRANT SELECT ON tuxout.vistapedidomonto TO proveedor;
GRANT SELECT, INSERT, UPDATE, DELETE ON tuxout.vistapedidomonto TO backoffice;

GRANT SELECT ON tuxout.vistapedidosempresa TO usuario;
GRANT SELECT ON tuxout.vistapedidosempresa TO proveedor;
GRANT SELECT, INSERT, UPDATE, DELETE ON tuxout.vistapedidosempresa TO backoffice;

GRANT SELECT ON tuxout.vistapedidospendientes TO usuario;
GRANT SELECT ON tuxout.vistapedidospendientes TO proveedor;
GRANT SELECT, INSERT, UPDATE, DELETE ON tuxout.vistapedidospendientes TO backoffice;

GRANT SELECT ON tuxout.vistaproducto TO usuario;
GRANT SELECT ON tuxout.vistaproducto TO proveedor;
GRANT SELECT, INSERT, UPDATE, DELETE ON tuxout.vistaproducto TO backoffice;