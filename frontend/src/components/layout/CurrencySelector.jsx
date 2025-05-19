import React from "react";

function CurrencySelector({ currency }) {

    const currencies = [
        { code: "mad", cd: "MAD", label: "Moroccan Dirham (MAD)", flag: "https://flagcdn.com/w40/ma.png" },
        { code: "usd", cd: "USD", label: "US Dollar (USD)", flag: "https://flagcdn.com/w40/us.png" },
        { code: "eur", cd: "EUR", label: "Euro (EUR)", flag: "https://flagcdn.com/w40/eu.png" },
        { code: "gbp", cd: "GBP", label: "British Pound (GBP)", flag: "https://flagcdn.com/w40/gb.png" },
    ];

    // Trouver la devise sélectionnée
    const selectedCurrency = currencies.find((c) => c.code === currency);

    return (
        <div className="fixed bottom-20 sm:bottom-20 md:bottom-5 left-4 bg-white shadow-lg shadow-white rounded-md z-70">

            {/* Afficher la devise sélectionnée */}
            <div
                className="flex items-center space-x-2 border border-gray-300 rounded-md px-4 py-2 hover:shadow-md"
            >
                <img
                    src={selectedCurrency?.flag}
                    alt={`${selectedCurrency?.label} Flag`}
                    className="w-5 h-5 rounded-full"
                />
                <span className="text-sm font-medium">{selectedCurrency?.cd}</span>
            </div>


        </div>
    );
}

export default CurrencySelector;