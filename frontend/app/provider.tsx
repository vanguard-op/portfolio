"use client";

import { PortfolioRepositoryContext } from "@/lib/context/context";
import PortfolioRepositoryMock from "@/lib/repository/mock";
import PortfolioRepositoryProd from "@/lib/repository/prod";

export function ContextProvider({ children }: Readonly<{ children: React.ReactNode }>) {
    const portfolioRepo = new PortfolioRepositoryProd();
    return (
        <PortfolioRepositoryContext.Provider value={portfolioRepo}>
            {children}
        </PortfolioRepositoryContext.Provider>
    )
}