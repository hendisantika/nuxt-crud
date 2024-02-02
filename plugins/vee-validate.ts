import {defineRule} from 'vee-validate';
import {max, max_value, min, min_value, required} from '@vee-validate/rules';

export default defineNuxtPlugin(() => {
    defineRule('required', required);
    defineRule('min', min);
    defineRule('min_value', min_value);
    defineRule('max', max);
    defineRule('max_value', max_value);
});
