import { ICar } from "@/models/Car";
import { IUser } from "@/models/User";
import { IOrder, IRental } from "@/models/Order";

export type { ICar, IUser, IOrder, IRental };

export interface CheckoutBody {
  carId: string;
  rentalDays: number;
  pickupDate?: string;
  returnDate?: string;
  pickupTime?: string;
  returnTime?: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  returnLocation?: string;
  flightNotes?: string;
  totalCost?: number;
  totalAmount?: number;
  [key: string]: any;
}

export type CheckoutRequestBody = CheckoutBody;
