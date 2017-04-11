$(function() {


    Morris.Donut({
        element: 'morris-donut-chart',
        data: [{
            label: "En almacen",
            value: 756
        }, {
            label: "En consumo",
            value: 250
        }, {
            label: "Usados",
            value: 650
        }],
        resize: true
    });

    Morris.Bar({
        element: 'morris-bar-chart',
        data: [{
            y: 'Enero',
            a: 1000,
            b: 300,
            c: 450 
        }, {
            y: 'Febrero',
            a: 750,
            b: 350,
            c: 400
        }, {
            y: 'Marzo',
            a: 500,
            b: 400,
            c: 400
        }, {
            y: 'Abril',
            a: 750,
            b: 650,
            c: 400
        }, {
            y: 'Mayo',
            a: 500,
            b: 500,
            c: 400
        }, {
            y: 'Junio',
            a: 750,
            b: 850,
            c: 400
        }, {
            y: 'Julio',
            a: 1000,
            b: 1000,
            c: 400
        }],
        xkey: 'y',
        ykeys: ['a', 'b', 'c'],
        labels: ['Almacen', 'Consumo', 'Usados'],
        hideHover: 'auto',
        resize: true
    });
    
});
