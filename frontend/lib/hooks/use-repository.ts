"use client";

import { useContext } from "react";
import { PortfolioRepositoryContext } from "../context/context";

export function useRepository() {
    const repo = useContext(PortfolioRepositoryContext);
    if (!repo) throw new Error("useRepository must be used within a ContextProvider");
    return repo;
}
