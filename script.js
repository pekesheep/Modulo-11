const reservas = [
    {
        tipoHabitacion: "standard",
        desayuno: false,
        pax: 1,
        noches: 3
    },
    {
        tipoHabitacion: "standard",
        desayuno: false,
        pax: 1,
        noches: 4
    },
    {
        tipoHabitacion: "suite",
        desayuno: true,
        pax: 2,
        noches: 1
    }
];

class ReservaCliente {
    constructor() {
        this._reserva = [];
        this._subtotal = 0;
        this._total = 0;
        this._desayuno = false;
    }

    calculaPrecio(tipoHabitacion) {
        switch (tipoHabitacion) {
            case "standard":
                return 100;
            case "suite":
                return 150;
        }
        return 1;
    }

    breakfast(desayuno) {
        return !desayuno ? 0 : 15;
    }

    calculaSubtotal() {
        this._subtotal = this._reserva.reduce((acc, { pax, noches, tipoHabitacion, desayuno }) =>
            acc + (noches * (this.calculaPrecio(tipoHabitacion) + (pax - 1) * 40) + (pax * noches * this.breakfast(desayuno))), 0);
    }

    calculaTotal() {
        this._total = this._subtotal * 1.21;

    }

    get total() {
        return this._total;
    }


    get subtotal() {
        return this._subtotal;
    }

    set reserva(reservas) {
        this._reserva = reservas;
        this.calculaSubtotal();
        this.calculaTotal();
    }
}


class ReservaTour extends ReservaCliente {
    constructor() {
        super(reservas)
    }
    calculaSubtotal = () => {
        this._subtotal = this._reserva.reduce((acc, { pax, noches, desayuno }) =>
            acc + (noches * 100 + (pax - 1) * 40) + (pax * noches * this.breakfast(desayuno)), 0);
    }

    calculaTotal = () => {
        this._total = this._subtotal * 1.21 * 0.85;
    }
}

//Reserva de cliente
const reservaHotel = new ReservaCliente();
reservaHotel.reserva = reservas;
console.log("Reserva cliente:")
console.log('Subtotal', reservaHotel.subtotal.toFixed(2), '€');
console.log('Total', reservaHotel.total.toFixed(2), '€');

//Reserva de tour
const reservaHotelTour = new ReservaTour();
reservaHotelTour.reserva = reservas;
console.log("Reserva tour:")
console.log('Subtotal', reservaHotelTour.subtotal.toFixed(2), '€');
console.log('Total', reservaHotelTour.total.toFixed(2), '€');

