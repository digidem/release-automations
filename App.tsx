import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import {
	applicationId,
	applicationName,
	nativeApplicationVersion,
	nativeBuildVersion,
} from 'expo-application'

export default function App() {
	return (
		<SafeAreaView style={styles.container}>
			<StatusBar style="dark" />

			<Text style={[styles.title, styles.bold]}>{applicationName}</Text>

			<View style={styles.infoContainer}>
				<View>
					<Text style={styles.bold}>Application ID:</Text>
					<Text>{applicationId}</Text>
				</View>
				<View>
					<Text style={styles.bold}>Application Version:</Text>
					<Text>{nativeApplicationVersion}</Text>
				</View>
				<View>
					<Text style={styles.bold}>Build Version:</Text>
					<Text>{nativeBuildVersion}</Text>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 80,
		paddingHorizontal: 20,
		gap: 40,
		margin: 0,
	},
	infoContainer: {
		gap: 20,
	},
	title: {
		fontSize: 24,
	},
	bold: {
		fontWeight: 'bold',
	},
})
