import React, { FormEvent, useState, ChangeEvent } from 'react'
import {
  Paper,
  TextField,
  makeStyles,
  Theme,
  createStyles,
  Button,
  Typography,
  Modal,
  ModalProps
} from '@material-ui/core'
import IUser from '../../interfaces/User'

const useStyles = makeStyles((theme: Theme) => {
  return createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    },
    body: {
      padding: theme.spacing(4),
      border: '4px solid #aaa',
      outline: 'none'
    },
    textFilelds: {
      margin: theme.spacing(1),
      width: '100%'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: theme.spacing(40)
    },
    button: {
      alignSelf: 'flex-end'
    }
  })
})

type formData = 'firstname' | 'lastname' | 'email'

type formState = {
  [prop in formData]: {
    value: string
    valid: boolean
    message: string
  }
}

export type Props = {
  onClose: ModalProps['onClose']
  onSave?: (user: IUser) => void
}

export const UserModal: React.FC<Props> = ({ onClose, onSave }) => {
  const classes = useStyles()

  const [form, setForm] = useState<formState>({
    firstname: { value: '', valid: false, message: ' ' },
    lastname: { value: '', valid: false, message: ' ' },
    email: { value: '', valid: false, message: ' ' }
  })
  const [validate, setValidate] = useState(false)

  const onInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    let valid: boolean = false
    let message: string = ' '
    switch (name) {
      case 'email':
        valid = /^\w+@\w+\.\w+$/.test(value)
        !valid && (message = 'Incorrect e-mail')
        break
      default:
        valid = value.length > 2
        !valid && (message = `please, fill ${name} 3+ characters`)
        break
    }
    setForm(state => ({ ...state, [name]: { value, valid, message } }))
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setValidate(true)
    if (onSave && Object.values(form).every(e => e.valid)) {
      onSave({
        firstname: form.firstname.value,
        lastname: form.lastname.value,
        email: form.email.value
      })
    }
  }

  return (
    <Modal open={true} onClose={onClose} className={classes.root}>
      <Paper className={classes.body}>
        <Typography variant="h6">Create user</Typography>
        <form onSubmit={onSubmit} className={classes.form}>
          <TextField
            className={classes.textFilelds}
            size="small"
            label="First name"
            variant="outlined"
            required
            name="firstname"
            value={form.firstname.value}
            onInput={onInput}
            error={validate && !form.firstname.valid}
            helperText={validate ? form.firstname.message : ' '}
          />
          <TextField
            className={classes.textFilelds}
            size="small"
            label="Last name"
            variant="outlined"
            required
            name="lastname"
            value={form.lastname.value}
            onInput={onInput}
            error={validate && !form.lastname.valid}
            helperText={validate ? form.lastname.message : ' '}
          />
          <TextField
            className={classes.textFilelds}
            size="small"
            label="E-mail"
            variant="outlined"
            required
            name="email"
            value={form.email.value}
            onInput={onInput}
            error={validate && !form.email.valid}
            helperText={validate ? form.email.message : ' '}
          />
          <Button
            className={classes.button}
            type="submit"
            color="primary"
            variant="contained"
          >
            Save
          </Button>
        </form>
      </Paper>
    </Modal>
  )
}
