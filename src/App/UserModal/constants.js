import {
  DatePicker,
  GenderRadios,
  CitizenId,
  MobilePhone,
  ExpectedSalary,
  Input,
  Select
} from '../../components/forms'

const titleOptions = [
  {
    value: 'Mr.',
    label: 'Mr.'
  },
  {
    value: 'Mrs.',
    label: 'Mrs.'
  },
  {
    value: 'Ms',
    label: 'Ms.'
  }
]

const nationalityOptions = [
  {
    value: 'Thai',
    label: 'Thai'
  }
]

export const INITIAL_VALUES = {
  title: titleOptions[0].value,
  firstName: '',
  lastName: '',
  nationality: '',
  gender: '',
  birthday: null,
  citizenId: null,
  mobilePhone: {
    countryCode: '+66',
    number: '',
  },
  passportNo: '',
  expectedSalary: ''
}

export const FIELDS = [
  [
    {
      name: 'title',
      label: 'Title',
      Component: Select,
      options: titleOptions,
      required: true
    },
    {
      name: 'firstName',
      label: 'First Name',
      Component: Input,
      required: true
    },
    {
      name: 'lastName',
      label: 'Last Name',
      Component: Input,
      required: true
    }
  ],
  [
    {
      name: 'birthday',
      label: 'Birthday',
      Component: DatePicker,
      placeholder: 'MM/DD/YYYY',
      required: true
    },
    {
      name: 'nationality',
      label: 'Nationality',
      Component: Input,
      Component: Select,
      placeholder: '-- Please Select --',
      options: nationalityOptions
    }
  ],
  [
    {
      name: 'citizenId',
      label: 'Citizen ID',
      Component: CitizenId,
    }
  ],
  [
    {
      name: 'gender',
      label: 'Gender',
      Component: GenderRadios,
    }
  ],
  [
    {
      name: 'mobilePhone',
      label: 'Mobile Phone',
      Component: MobilePhone,
      required: true
    }
  ],
  [
    {
      name: 'passportNo',
      label: 'Password No.',
      Component: Input,
    }
  ],
  [
    {
      name: 'expectedSalary',
      label: 'Expected Salary',
      Component: ExpectedSalary,
      required: true
    }
  ]
]
