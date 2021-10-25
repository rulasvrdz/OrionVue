import {Options, Vue} from 'vue-class-component';
import Dropdown from '@/components/dropdown/dropdown.vue';

@Options({
    name: 'languages-dropdown',
    components: {
        'app-dropdown': Dropdown
    }
})
export default class Languages extends Vue {
    public selectedLanguage: string = null;
    public languages: any = [
        {
            key: 'es',
            flag: 'flag-icon-mx',
            label: 'languages.spanish'
        },
        {
            key: 'en',
            flag: 'flag-icon-us',
            label: 'languages.english'
        },
    ];

    public mounted() {
        this.selectedLanguage = this.$i18n.locale;
    }

    get flagIcon() {
        if (this.selectedLanguage === 'us') {
            return 'flag-icon-us';
        }
        return 'flag-icon-mx';
    }

    public changeLanguage(langCode: string) {
        if (this.$i18n.locale !== langCode) {
            this.$i18n.locale = langCode;
            this.selectedLanguage = langCode;
        }
    }
}
