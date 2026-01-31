
export interface LevelDetail {
  id: number;
  title: string;
  condition: string;
  benefit: string;
  color: string;
  icon: string;
  kpiDetails: string[];
  privileges: string[];
  strategicRole: string;
  displayImage?: string; 
}

export interface RoadmapItem {
  period: string;
  target: string;
  tasks: string[];
  status: 'current' | 'future';
  color: string;
}
