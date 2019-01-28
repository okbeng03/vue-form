export default function (def, schema) {
  const type = schema.type

  if (type === 'number') {
    def.type = 'number'
  }
}
