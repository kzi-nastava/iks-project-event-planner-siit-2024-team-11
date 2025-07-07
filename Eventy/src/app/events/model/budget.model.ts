import { SolutionDTO } from "../../solutions/model/solutions.model";

export interface Budget {
    categoryItems: BudgetItem[]
    eventDate: Date
}

export interface BudgetItem {
    id: number,
    category: string,
    plannedFunds: number,
    budgetedEntries: SolutionDTO[]
}