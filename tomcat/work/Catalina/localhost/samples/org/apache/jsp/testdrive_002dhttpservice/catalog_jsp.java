package org.apache.jsp.testdrive_002dhttpservice;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;
import flex.samples.product.ProductService;
import flex.samples.product.Product;
import java.util.List;

public final class catalog_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.List _jspx_dependants;

  private javax.el.ExpressionFactory _el_expressionfactory;
  private org.apache.AnnotationProcessor _jsp_annotationprocessor;

  public Object getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
    _jsp_annotationprocessor = (org.apache.AnnotationProcessor) getServletConfig().getServletContext().getAttribute(org.apache.AnnotationProcessor.class.getName());
  }

  public void _jspDestroy() {
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write("\r\n");
      out.write("<?xml version=\"1.0\" encoding=\"utf-8\"?>\r\n");
      out.write("<catalog>\r\n");

	ProductService srv = new ProductService();
	List list = null;
	list = srv.getProducts();
	Product product;
	for (int i=0; i<list.size(); i++)
	{
		product = (Product) list.get(i);

      out.write("\t\r\n");
      out.write("    <product productId=\"");
      out.print( product.getProductId());
      out.write("\">\r\n");
      out.write("        <name>");
      out.print( product.getName() );
      out.write("</name>\r\n");
      out.write("        <description>");
      out.print( product.getDescription() );
      out.write("</description>\r\n");
      out.write("        <price>");
      out.print( product.getPrice() );
      out.write("</price>\r\n");
      out.write("        <image>");
      out.print( product.getImage() );
      out.write("</image>\r\n");
      out.write("        <category>");
      out.print( product.getCategory() );
      out.write("</category>\r\n");
      out.write("        <qtyInStock>");
      out.print( product.getQtyInStock() );
      out.write("</qtyInStock>\r\n");
      out.write("    </product>\r\n");

	}

      out.write("\r\n");
      out.write("</catalog>");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try { out.clearBuffer(); } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
