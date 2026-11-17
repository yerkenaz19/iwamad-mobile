
import { View, Text, StyleSheet } from 'react-native'
import { useHolidays } from '../hooks/useHolidays'

type Props = {
  date: string
}

export default function HolidayNote({ date }: Props) {
  const year = Number(date.slice(0, 4))
  const { data, isPending, isError } = useHolidays(year)

  if (isPending) {
    return <Text>Checking holidays</Text>
  }

  if (isError) {
    return <Text>Holidays unavailable</Text>
  }

  const holiday = data.find((item) => item.date === date)

  if (holiday) {
    return (
      <View style={styles.container}>
        <Text>Public holiday: {holiday.name}</Text>
      </View>
    )
  }

  return <Text>Not a public holiday</Text>
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
})
