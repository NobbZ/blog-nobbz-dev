/**
 * @typedef {import('mdast').Root} Root
 *
 * @typedef Options
 *   Configuration (optional).
 * @property {boolean} [someField]
 *   Some option.
 */

// To type options and that the it works with `mdast`:
import { visit } from 'unist-util-visit';

export default function remarkCodeBlock(options = {}) {
	const plugins = options.plugins || [];

	return (tree) => {
		visit(tree, (node) => {
			if (node.type == 'html' && node.value.includes('class="astro-code"')) {
				node.value = node.value.replace(
					'"astro-code"',
					(itm) => itm + ' ' + String(node.meta).replace(/(\w+\=.*?)/g, 'data-$1')
				);
			}
		});
	};
}
