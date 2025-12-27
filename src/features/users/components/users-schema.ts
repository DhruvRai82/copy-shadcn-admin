
import { z } from 'zod';
import {
    User,
    Shield,
    Briefcase,
    Store,
} from 'lucide-react';

// User Schema
export const userSchema = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z.string(),
    username: z.string(),
    email: z.string(),
    phoneNumber: z.string(),
    status: z.string(),
    role: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type User = z.infer<typeof userSchema>;

// Constants
export const roles = [
    {
        label: 'Super Admin',
        value: 'super_admin',
        icon: Shield,
    },
    {
        label: 'Admin',
        value: 'admin',
        icon: User,
    },
    {
        label: 'Manager',
        value: 'manager',
        icon: Briefcase,
    },
    {
        label: 'Cashier',
        value: 'cashier',
        icon: Store,
    },
];

export const userStatus = [
    {
        label: 'Active',
        value: 'active',
    },
    {
        label: 'Inactive',
        value: 'inactive',
    },
    {
        label: 'Invited',
        value: 'invited',
    },
    {
        label: 'Suspended',
        value: 'suspended',
    },
];

export const callTypes = new Map<string, string>([
    ['active', 'bg-teal-100/30 text-teal-900 dark:text-teal-200 border-teal-200'],
    ['inactive', 'bg-neutral-300/40 border-neutral-300'],
    ['invited', 'bg-sky-200/40 text-sky-900 dark:text-sky-100 border-sky-300'],
    ['suspended', 'bg-destructive/10 dark:bg-destructive/50 text-destructive dark:text-primary border-destructive/10'],
]);
