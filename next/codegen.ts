import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
    schema: './schema.graphql',
    documents: ['graphql/**/*.graphql'],
    generates: {
        './graphql/codegen/': {
            preset: 'client'
        }
    }
}

export default config