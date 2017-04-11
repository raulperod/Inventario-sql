$(function() {
/*
    Morris.Area({
        element: 'morris-area-chart',
        data: [{
            period: '2017-1',
            Dila: 2660,
            Cantabria: 4293
        }, {
            period: '2017-2',
            Dila: 2780,
            Cantabria: 2294
        }, {
            period: '2017-3',
            Dila: 412,
            Cantabria: 1969
        }, {
            period: '2017-4',
            Dila: 767,
            Cantabria: 397
        }, {
            period: '2017-5',
            Dila: 681,
            Cantabria: 114
        }, {
            period: '2017-6',
            Dila: 5400,
            Cantabria: 5040
        }, {
            period: '2017-7',
            Dila: 4820,
            Cantabria: 7095
        }, {
            period: '2017-8',
            Dila: 1507,
            Cantabria: 567
        }, {
            period: '2017-9',
            Dila: 1068,
            Cantabria: 446
        }, {
            period: '2017-10',
            Dila: 843,
            Cantabria: 713
        }],
        xkey: 'period',
        ykeys: ['Dila', 'Cantabria'],
        labels: ['Dila', 'Cantabria'],
        pointSize: 2,
        hideHover: 'auto',
        resize: true
    });
*/
    /*Morris.Donut({
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
    });*/
    Morris.Donut({
        element: 'morris-donut-chart',
        data: [{
            label: "Dila",
            value: 5300
        }, {
            label: "Cantabria",
            value: 4998
        }],
        resize: true
    });

    Morris.Bar({
        element: 'morris-bar-chart',
        data: [{
            y: 'Enero',
            a: 1000,
            b: 900
        }, {
            y: 'Febrero',
            a: 750,
            b: 650
        }, {
            y: 'Marzo',
            a: 500,
            b: 400
        }, {
            y: 'Abril',
            a: 750,
            b: 650
        }, {
            y: 'Mayo',
            a: 500,
            b: 500
        }, {
            y: 'Junio',
            a: 750,
            b: 850
        }, {
            y: 'Julio',
            a: 1000,
            b: 1000
        }],
        xkey: 'y',
        ykeys: ['a', 'b'],
        labels: ['Dila', 'Cantabria'],
        hideHover: 'auto',
        resize: true
    });


    Morris.Line({
      element: 'morris-line-chart',
      data: [
        { y: '2017-1', a: 1000, b: 900 },
        { y: '2017-2', a: 750,  b: 650 },
        { y: '2017-3', a: 500,  b: 400 },
        { y: '2017-4', a: 750,  b: 750 },
        { y: '2017-5', a: 500,  b: 700 },
        { y: '2017-6', a: 750,  b: 850 },
        { y: '2017-7', a: 1000, b: 900 }
      ],
      xkey: 'y',
      ykeys: ['a', 'b'],
      labels: ['Dila', 'Cantabria']
    });

});
