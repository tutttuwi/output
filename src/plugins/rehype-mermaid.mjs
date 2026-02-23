import { visit } from "unist-util-visit";

/**
 * Rehype plugin to convert Mermaid code blocks to <pre class="mermaid"> elements
 * This allows MermaidJS to render them on the client side
 */
export function rehypeMermaid() {
	return (tree) => {
		visit(tree, (node) => {
			if (
				node.type === "element" &&
				node.tagName === "pre" &&
				node.children &&
				node.children[0] &&
				node.children[0].type === "element" &&
				node.children[0].tagName === "code"
			) {
				const codeNode = node.children[0];
				const className = codeNode.properties?.className || [];
				const isMermaid = Array.isArray(className) && className.includes("language-mermaid");

				if (isMermaid) {
					// Convert to <pre class="mermaid"> with the code content as text
					node.tagName = "pre";
					node.properties = {
						...node.properties,
						className: ["mermaid"],
					};

					// Extract the text content from the code block
					const getTextContent = (node) => {
						if (node.type === "text") {
							return node.value;
						}
						if (node.children) {
							return node.children.map(getTextContent).join("");
						}
						return "";
					};

					const mermaidCode = getTextContent(codeNode);
					node.children = [
						{
							type: "text",
							value: mermaidCode,
						},
					];
				}
			}
		});
	};
}
