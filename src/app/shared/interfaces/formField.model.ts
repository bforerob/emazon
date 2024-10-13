export interface FormField {
    type: string; 
    name: string; 
    label: string; 
    placeholder: string; 
    value?: any; 
    validators?: any[]; 
    options?: { key: string; value: string }[]; 
    errorMessages?: { [key: string]: string };
  }
    