import {ref} from 'vue';
import {DateTime} from 'luxon';

const today = ref(DateTime.now().toFormat('yyyy-LL-dd'));

export default today;