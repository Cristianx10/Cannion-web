function paginaCargadaNuemro(){
    var formatNumber = {
        separador: ".", // separador para los miles
        sepDecimal: ',', // separador para los decimales
        formatear: function (num) {
            num += '';
            var splitStr = num.split('.');
            var splitLeft = splitStr[0];
            var splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : '';
            var regx = /(\d+)(\d{3})/;
            while (regx.test(splitLeft)) {
                splitLeft = splitLeft.replace(regx, '$1' + this.separador + '$2');
            }
            return this.simbol + splitLeft + splitRight;
        },
        new: function (num, simbol) {
            this.simbol = simbol || '';
            return this.formatear(num);
        }
    }

    var numeros = document.querySelectorAll(".articulo__informacion__precio");

    numeros.forEach((n) => {
        let text = (n.innerHTML).replace("$", "");
        let num = parseInt(text);
        
        n.innerHTML = "$" + formatNumber.new(num);
    });

    numeros = document.querySelectorAll(".numero");

    numeros.forEach((n) => {
        let text = (n.innerHTML).replace("$", "");
        let num = parseInt(text);
        
        n.innerHTML = "$" + formatNumber.new(num);
    });
}
    
window.addEventListener("load", paginaCargadaNuemro);