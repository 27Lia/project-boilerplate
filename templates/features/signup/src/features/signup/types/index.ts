export interface SignupFormValues {
  termsAgreed: boolean;
  privacyAgreed: boolean;
  marketingAgreed: boolean;
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface StepProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
}
