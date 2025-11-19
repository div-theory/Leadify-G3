import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
}

export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  highlight?: boolean;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}