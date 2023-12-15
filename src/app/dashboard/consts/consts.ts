export class DisplayColumnsConsts {
    static UserColumns = [
        { name: 'fullName', label: 'Name', type: 'link' },
        { name: 'email',label: 'Email',type: '',},
        { name: 'roleId',label: 'Role', parentProperty: 'roleName', type: 'parentProperty' },
        { name: 'teamId',label: 'Team',parentProperty: 'teamName', type: 'parentProperty' },
        { name: 'projectId',label: 'Project', parentProperty: 'teamId', childProperty: 'name', type: 'grandParentProperty' },
        { name: 'isActive',label: 'Is Active',type: 'question' },
        { name: 'options',label: '',type: 'actions' },
    ]
}