import { Model } from 'mongoose';

export const validateUnique = (inputError: any) => {
    return async (
        fields: { [key: string]: string }[],
        model: Model<any>
    ): Promise<void> => {
        const errors: string[] = [];
        for (const i in fields) {
            const field = fields[i];
            const match = await model.find(field);
            if (match.length) {
                errors.push(Object.keys(field)[0]);
            }
        }

        if (errors.length) {
            throw new inputError('Form validation error', {
                invalidArgs: errors,
            });
        }
    };
};
