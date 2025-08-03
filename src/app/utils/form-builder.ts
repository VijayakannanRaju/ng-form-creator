import { FormArray, FormControl, FormGroup, Validators } from "@angular/forms";
import { FormComponentMetadata } from "../form.type";
import { buildValidators } from "./form-validators";

export function buildFormGroup(components: FormComponentMetadata[]): FormGroup {
    const group = new FormGroup({});

    for (const comp of components) {
        if (comp.type === 'TEXTBOX') {
            // const validators = [];
            // if (comp.required) validators.push(Validators.required);
            // if (comp.minLength) validators.push(Validators.minLength(comp.minLength));
            // if (comp.maxLength) validators.push(Validators.maxLength(comp.maxLength));

            const validators = buildValidators({
                required: comp.required,
                minLength: comp.minLength,
                maxLength: comp.maxLength,
            });
            group.addControl(comp.name, new FormControl('', validators));
        } else if (comp.type === 'EMAILBOX') {
            const validators = [Validators.email];
            if (comp.required) validators.push(Validators.required);
            group.addControl(comp.name, new FormControl('', validators));
        } else if (comp.type === 'NUMBERBOX') {
            const validators = buildValidators({
                required: comp.required,
                minLength: comp.min,
                maxLength: comp.max,
            });
            group.addControl(comp.name, new FormControl(null, validators));
        } else if (comp.type === 'TEXTAREA') {
            const validators = [];
            if (comp.required) validators.push(Validators.required);
            group.addControl(comp.id!, new FormControl('', validators));
        } else if (comp.type === 'DROPDOWN') {
            const validators = [];
            if (comp.required) validators.push(Validators.required);
            group.addControl(comp.name, new FormControl('', validators));
        } else if (comp.type === 'RADIO_GROUP') {
            const validators = [];
            if (comp.required) validators.push(Validators.required);
            group.addControl(comp.name, new FormControl('', validators));
        } else if (comp.type === 'CHECKBOX_SINGLE') {
            const validators = [];
            if (comp.required) validators.push(Validators.requiredTrue);
            group.addControl(comp.name, new FormControl(false, validators));

        } else if (comp.type === 'CHECKBOX_MULTI') {
            const validators = [];
            if (comp.required) validators.push(Validators.required); // can add custom min-length validator if needed
            group.addControl(comp.name, new FormControl([], validators));
        } else if (comp.type === 'DATETIME') {
            const validators = [];
            if (comp.required) validators.push(Validators.required);

            group.addControl(comp.name, new FormControl('', validators));
        } else if (comp.type === 'DATEONLY') {
            const validators = [];
            if (comp.required) validators.push(Validators.required);
            group.addControl(comp.name, new FormControl(null, validators));
        } else if (comp.type === 'TIMEONLY') {
            const validators = [];
            if (comp.required) validators.push(Validators.required);
            group.addControl(comp.name, new FormControl(null, validators));
        }

        else if (comp.type === 'FORM_GROUP') {
            const nestedGroup = buildFormGroup(comp.components);
            group.addControl(comp.name, nestedGroup);
        } else if (comp.type === 'FORM_ARRAY') {
            // build one initial array item
            const arrayItemGroup = buildFormGroup(comp.components);
            const formArray = new FormArray<FormGroup>([arrayItemGroup]);
            group.addControl(comp.name, formArray);
        }
    }

    return group;
}