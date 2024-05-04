const currencyFormat = Intl.NumberFormat('nl-BE', {
	style: 'currency',
	currency: 'EUR',
});

export const formatToEuroCurrency = (value : number) => currencyFormat.format(Number(value));

