## Default Form Type
基于JSON schema规范描述，我们可以生成以下默认类型的表单元素：

Schema                | Form Type
:-------------------: | :-------:
type: string & enum属性 | select
type: string          | text
type: number          | number
type: integer         | number
type: boolean         | checkbox
type: object          | fieldset
type: array & enum属性  | checkboxs
type: array           | list可增删


其他类型请通过Form Definition来定义
