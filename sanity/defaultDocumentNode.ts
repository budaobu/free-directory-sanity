import { isDev, type SanityDocument } from 'sanity';
import { Iframe } from 'sanity-plugin-iframe-pane';
import type { DefaultDocumentNodeResolver } from 'sanity/structure';

const previewUrl = 'https://indie-hackers-site-sanity.vercel.app';

const defaultDocumentNode: DefaultDocumentNodeResolver = (
	S,
	{ schemaType },
) => {
	const editorView = S.view.form();

	switch (schemaType) {
		case 'post':
			return S.document().views([
				editorView,
				S.view
					.component(Iframe)
					.title('Preview')
					.options({
						url: (
							doc: SanityDocument & {
								slug?: { current: string }
							},
						) => {
							const base = isDev ? 'http://localhost:3001' : previewUrl;
							const slug = doc?.slug?.current;
							const path = slug === 'index' ? '' : slug;
							const directory = 'posts';

							console.log('preview, url', [base, directory, path].filter(Boolean).join('/'));
							return [base, directory, path].filter(Boolean).join('/');
						},
						reload: {
							button: true,
						},
					}),
			])

		default:
			return S.document().views([editorView])
	}
}

export default defaultDocumentNode
