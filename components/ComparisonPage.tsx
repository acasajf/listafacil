import React, { useMemo } from 'react';
import { ShoppingList, Market, ProductPrice } from '../types';
import { mockMarkets, mockPrices } from '../data/mockData';

interface ComparisonPageProps {
    list: ShoppingList;
    onBack: () => void;
}

const ComparisonPage: React.FC<ComparisonPageProps> = ({ list, onBack }) => {
    
    // Calculate totals per market
    const comparisonData = useMemo(() => {
        return mockMarkets.map(market => {
            let total = 0;
            let missingItems = 0;
            
            const itemsWithPrices = list.items.map(item => {
                // Simple name matching (case insensitive partial match logic could be better but exact for now)
                // In a real app, we would normalize names or use IDs.
                const priceEntry = mockPrices.find(p => 
                    p.marketId === market.id && 
                    item.name.toLowerCase().includes(p.productName.toLowerCase())
                );

                if (priceEntry) {
                    total += priceEntry.price * item.quantity;
                } else {
                    missingItems++;
                }

                return {
                    ...item,
                    price: priceEntry ? priceEntry.price : null,
                    subtotal: priceEntry ? priceEntry.price * item.quantity : null
                };
            });

            return {
                market,
                total,
                missingItems,
                items: itemsWithPrices
            };
        });
    }, [list]);

    // Find cheapest market (ignoring those with too many missing items?)
    // For now, just simple min total
    const bestPrice = Math.min(...comparisonData.filter(d => d.total > 0).map(d => d.total));

    return (
        <div className="flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark">
            {/* Header */}
            <header className="flex w-full items-center border-b border-zinc-200/80 dark:border-zinc-800/80 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-sm sticky top-0 z-10 px-4 sm:px-8 py-3">
                <button onClick={onBack} className="mr-4 p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
                    Comparar: {list.name}
                </h1>
            </header>

            <main className="flex-1 p-4 sm:p-8 overflow-x-auto">
                <div className="min-w-[800px]"> 
                    {/* Comparison Table */}
                    <div className="grid gap-4" style={{ gridTemplateColumns: `2fr repeat(${mockMarkets.length}, 1fr)` }}>
                        
                        {/* Header Row */}
                        <div className="font-bold text-zinc-500 dark:text-zinc-400 p-4">Produto</div>
                        {comparisonData.map(data => (
                            <div key={data.market.id} className={`flex flex-col items-center p-4 rounded-t-lg ${data.total === bestPrice && data.total > 0 ? 'bg-green-50 dark:bg-green-900/20 border-t-4 border-green-500' : ''}`}>
                                <div className="h-12 w-12 rounded-full bg-white p-1 shadow-sm mb-2 flex items-center justify-center overflow-hidden">
                                    {data.market.logo ? (
                                        <img src={data.market.logo} alt={data.market.name} className="max-h-full max-w-full" />
                                    ) : (
                                        <span className="material-symbols-outlined text-zinc-400">store</span>
                                    )}
                                </div>
                                <span className="text-center font-bold text-zinc-900 dark:text-zinc-100 text-sm">{data.market.name}</span>
                                <span className="text-xs text-zinc-500 uppercase mt-1">{data.market.type}</span>
                            </div>
                        ))}

                        {/* Item Rows */}
                        {list.items.map((item, index) => (
                            <React.Fragment key={item.id}>
                                <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center">
                                    <div>
                                        <div className="font-medium text-zinc-900 dark:text-zinc-100">{item.name}</div>
                                        <div className="text-xs text-zinc-500">{item.quantity} {item.unit}</div>
                                    </div>
                                </div>
                                {comparisonData.map(data => {
                                    const itemData = data.items[index];
                                    return (
                                        <div key={`${data.market.id}-${item.id}`} className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex flex-col items-center justify-center">
                                            {itemData.price ? (
                                                <>
                                                    <span className="font-bold text-zinc-700 dark:text-zinc-300">
                                                        R$ {itemData.subtotal?.toFixed(2)}
                                                    </span>
                                                    <span className="text-xs text-zinc-400">
                                                        (R$ {itemData.price.toFixed(2)} un)
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="text-zinc-300 dark:text-zinc-700">-</span>
                                            )}
                                        </div>
                                    );
                                })}
                            </React.Fragment>
                        ))}

                        {/* Totals Row */}
                        <div className="p-4 font-black text-lg text-right text-zinc-900 dark:text-zinc-100">
                            TOTAL ESTIMADO
                        </div>
                        {comparisonData.map(data => (
                            <div key={`total-${data.market.id}`} className={`p-4 flex flex-col items-center justify-center rounded-b-lg ${data.total === bestPrice && data.total > 0 ? 'bg-green-100 dark:bg-green-900/40' : 'bg-zinc-50 dark:bg-zinc-900'}`}>
                                <span className={`text-xl font-black ${data.total === bestPrice && data.total > 0 ? 'text-green-600 dark:text-green-400' : 'text-zinc-900 dark:text-zinc-100'}`}>
                                    R$ {data.total.toFixed(2)}
                                </span>
                                {data.missingItems > 0 && (
                                    <span className="text-xs text-red-500 mt-1">
                                        Faltam {data.missingItems} itens
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ComparisonPage;
