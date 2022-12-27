import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { container } from "tsyringe";
import { IDateProvider } from './DateProvider/IDateProvider';

container.registerSingleton<IDateProvider>(
    "DayjsDateProvider",
    DayjsDateProvider
)