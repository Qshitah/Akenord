import styles from "./Email.module.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
export default function Facture(orderData) {

    const calculateOrderSubtotal = () => {
        let subtotal = 0;
        if (orderData.productInfoList !== null) {
            orderData.productInfoList.forEach((product) => {
            subtotal += product[3] * product[2];
          });
        }
    
        return parseFloat(subtotal.toFixed(2)); // Assuming you want to display the subtotal with 2 decimal places
      };

  const generatePdf = () => {
    return new Promise((resolve) => {

      const elementHtml = `
    <div id=${styles.body}>
      <header className=${styles.clearfix}>
        <div id=${styles.logo}>
          <img src="logo.png" />
        </div>
        <h1 id=${styles.h1}>INVOICE #${orderData.id}</h1>
        <div id=${styles.company} className=${styles.clearfix}>
          <div>Akenord sarl</div>
          <div>
            455 Foggy Heights,
            <br /> Tangier,Morocco
          </div>
          <div>(212) 654-404611</div>
          <div>
            <a id=${styles.link} href="mailto:marouan.akechtah@gmail.com">marouan.akechtah@gmail.com</a>
          </div>
        </div>
        <div id=${styles.project}>
          <div>
            <span>CLIENT</span> ${orderData.first_name} ${orderData.last_name}
          </div>
          <div>
            <span>PHONE</span> ${orderData.phone_number}
          </div>
          <div>
            <span>ADDRESS</span> ${orderData.address}
          </div>
          <div>
            <span>EMAIL</span>
            <a id=${
              styles.link
            } href="mailto:${orderData.email}">${orderData.email}</a>
          </div>
          <div>
            <span>DATE</span> ${orderData.order_date}
          </div>
        </div>
      </header>
      <br />
      <main>
        <table id=${styles.table}>
          <thead>
            <tr>
              <th className=${styles.service}>IMAGE</th>
              <th className=${styles.desc}>PRODUCT</th>
              <th>PRICE</th>
              <th>QTY</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            ${orderData.productInfoList.map((value) => (
                `
                <tr>
                <td className=${styles.service}><img src=${JSON.parse(value[0])[0]} alt="" width="50px" height="50px"/></td>
                <td className=${styles.desc}>
                  <p>${value[1]}</p> 
                  ${value[4].trim() !== "" ? `<h5 >Size: ${value[4]}</h5>`: ''}
                  ${value[5].trim() !== "" ? `<h5>Color: ${value[5]}</h5>`: ''}
                </td>
                <td className=${styles.unit}>${value[3]}Dh</td>
                <td className=${styles.qty}>${value[2]}</td>
                <td className=${styles.total}>${(value[2] * value[3]).toFixed(2)}Dh</td>
                </tr>
                `
            ))}
            <tr>
              <td colspan="4">SUBTOTAL</td>
              <td className=${styles.total}>${calculateOrderSubtotal()}Dh</td>
            </tr>
            <tr>
              <td colspan="4">Shipping</td>
              <td className=${styles.total}>${orderData.shippingPrice}Dh</td>
            </tr>
            ${orderData.coupon !== null ?
            `
            <tr>
            <td colspan="4">Coupon</td>
            <td className=${styles.total}>${orderData.coupon.value}${orderData.coupon.discountType == "percentage" ? "%": "Dh"}
            </td>
            </tr>
            `: ''}
            <tr>
              <td colspan="4" className=${`${styles.grand} ${styles.total}`}>
                GRAND TOTAL
              </td>
              <td className=${`${styles.grand} ${styles.total}`}>${orderData.orderTotal}Dh</td>
            </tr>
          </tbody>
        </table>
        <div id=${styles.notices}>
          <div>PAYMENT METHOD:</div>
          <div className=${styles.notice}>
            ${orderData.paymentMethod}.
          </div>
        </div>
      </main>
      <footer id=${styles.footer}>
        Invoice was created on a computer and is valid without the signature and
        seal.
      </footer>
    </div>
  `;

      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      doc.html(elementHtml, {
        callback: function (pdf) {
          const pdfBytes = pdf.output("arraybuffer");
          const blob = new Blob([pdfBytes], { type: "application/pdf" });

          const formData = new FormData();
          formData.append("pdfFile", blob, "invoice.pdf");
          pdf.save(formData);
        },
        x: 10,
        y: 10,
        html2canvas: { scale: 0.24 }, // Adjust the scale factor as needed
      });
    });
  };

  generatePdf();
}
