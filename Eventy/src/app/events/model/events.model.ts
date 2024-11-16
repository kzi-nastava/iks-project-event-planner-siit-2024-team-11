export interface IActivity {
  name: string;
  description: string;
  location: string;
  timeRange: [Date, Date]
}

export interface IEventType {
  name: string;
  description: string;
  recommendedCategories: ICategory[];
}

interface ICategory {
  name: string;
  description: string;
}
