import { Subjects } from '../../enum/subjects.enum';

export interface LocationCreatedEvent {
  subject: Subjects.LocationCreated;
  data: {
    latitude: string;
    longitude: string;
    postalCode: number;
    city: string;
    state:string;
  };
}