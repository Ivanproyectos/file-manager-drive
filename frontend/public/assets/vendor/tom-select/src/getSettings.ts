import defaults from './defaults';
import { hash_key } from './utils';
import { TomOption, TomSettings } from './types/index';
import { iterate } from '@orchidjs/sifter/lib/utils';
import { TomInput } from './types/index';


export default function getSettings( input:TomInput, settings_user:Partial<TomSettings>):TomSettings{
	const settings:TomSettings	= Object.assign({}, defaults, settings_user);

	const attr_data				= settings.dataAttr;
	const field_label				= settings.labelField;
	const field_value				= settings.valueField;
	const field_disabled			= settings.disabledField;
	const field_optgroup			= settings.optgroupField;
	const field_optgroup_label	= settings.optgroupLabelField;
	const field_optgroup_value	= settings.optgroupValueField;

	const tag_name				= input.tagName.toLowerCase();
	let placeholder				= input.getAttribute('placeholder') || input.getAttribute('data-placeholder');

	if (!placeholder && !settings.allowEmptyOption) {
		const option		= input.querySelector('option[value=""]');
		if( option ){
			placeholder = option.textContent;
		}

	}

	const settings_element:{
		placeholder	: null|string,
		options		: TomOption[],
		optgroups	: TomOption[],
		items		: string[],
		maxItems	: null|number,
	} = {
		placeholder	: placeholder,
		options		: [],
		optgroups	: [],
		items		: [],
		maxItems	: null,
	};


	/**
	 * Initialize from a <select> element.
	 *
	 */
	const init_select = () => {
		let tagName;
		const options = settings_element.options;
		const optionsMap:{[key:string]:any} = {};
		let group_count = 1;

		const readData = (el:HTMLElement):TomOption => {

			let data	= Object.assign({},el.dataset); // get plain object from DOMStringMap
			const json	= attr_data && data[attr_data];

			if( typeof json === 'string' && json.length ){
				data = Object.assign(data,JSON.parse(json));
			}

			return data;
		};

		const addOption = (option:HTMLOptionElement, group?:string) => {

			const value = hash_key(option.value);
			if ( value == null ) return;
			if ( !value && !settings.allowEmptyOption) return;

			// if the option already exists, it's probably been
			// duplicated in another optgroup. in this case, push
			// the current group to the "optgroup" property on the
			// existing option so that it's rendered in both places.
			if (optionsMap.hasOwnProperty(value)) {
				if (group) {
					const arr = optionsMap[value][field_optgroup];
					if (!arr) {
						optionsMap[value][field_optgroup] = group;
					} else if (!Array.isArray(arr)) {
						optionsMap[value][field_optgroup] = [arr, group];
					} else {
						arr.push(group);
					}
				}

			}else{

				const option_data             = readData(option);
				option_data[field_label]    = option_data[field_label] || option.textContent;
				option_data[field_value]    = option_data[field_value] || value;
				option_data[field_disabled] = option_data[field_disabled] || option.disabled;
				option_data[field_optgroup] = option_data[field_optgroup] || group;
				option_data.$option			= option;

				optionsMap[value] = option_data;
				options.push(option_data);
			}

			if( option.selected ){
				settings_element.items.push(value);
			}
		};

		const addGroup = ( optgroup:HTMLOptGroupElement ) => {
			let id:string, optgroup_data

			optgroup_data							= readData(optgroup);
			optgroup_data[field_optgroup_label]		= optgroup_data[field_optgroup_label] || optgroup.getAttribute('label') || '';
			optgroup_data[field_optgroup_value]		= optgroup_data[field_optgroup_value] || group_count++;
			optgroup_data[field_disabled]			= optgroup_data[field_disabled] || optgroup.disabled;
			settings_element.optgroups.push(optgroup_data);

			id = optgroup_data[field_optgroup_value];

			iterate(optgroup.children, (option)=>{
				addOption(option as HTMLOptionElement, id);
			});

		};

		settings_element.maxItems = input.hasAttribute('multiple') ? null : 1;

		iterate(input.children,(child)=>{
			tagName = child.tagName.toLowerCase();
			if (tagName === 'optgroup') {
				addGroup(child as HTMLOptGroupElement);
			} else if (tagName === 'option') {
				addOption(child as HTMLOptionElement);
			}
		});

	};


	/**
	 * Initialize from a <input type="text"> element.
	 *
	 */
	const init_textbox = () => {
		const data_raw = input.getAttribute(attr_data);

		if (!data_raw) {
			const value = input.value.trim() || '';
			if (!settings.allowEmptyOption && !value.length) return;
			const values = value.split(settings.delimiter);

			iterate( values, (value) => {
				const option:TomOption = {};
				option[field_label] = value;
				option[field_value] = value;
				settings_element.options.push(option);
			});
			settings_element.items = values;
		} else {
			settings_element.options = JSON.parse(data_raw);
			iterate( settings_element.options, (opt) => {
				settings_element.items.push(opt[field_value]);
			});
		}
	};


	if (tag_name === 'select') {
		init_select();
	} else {
		init_textbox();
	}

	return Object.assign( {}, defaults, settings_element, settings_user) as TomSettings;
};
