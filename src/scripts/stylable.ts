export type Variables = Record<string, number | string>;
export type Classes = string | string[];

export default interface Stylable {
	className?: Classes;
	style?: string;
	variables?: Variables;
}

export function toClass(className: Classes): string {
	if (className instanceof Array) {
		return className.join(' ');
	}
	return className;
}

export function combine(style?: string, variables?: Variables): string {
	if (style && variables) {
		return `${style}; ${combine_variables(variables)}`;
	}
	return style || combine_variables(variables) || '';
}

function combine_variables(variables?: Variables): undefined | string {
	if (!variables) return undefined;

	return Object.entries(variables)
		.map(([varName, value]) => `--${varName}: ${value}`)
		.join(';');
}

export function fromProps(props: Stylable): { class: string; style: string } {
	return {
		class: toClass(props.className),
		style: combine(props.style, props.variables) || undefined,
	};
}
