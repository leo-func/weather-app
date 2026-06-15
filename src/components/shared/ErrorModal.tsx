import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";


type ErrorModalProps = {
    visible: boolean
    message: string | null
    onClose: () => void
}

export function ErrorModal({
    visible,
    message,
    onClose
} : ErrorModalProps) {
    return (
        <Modal
            visible={visible}
            transparent
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.container}>

                    <Text style={styles.title}>
                        Ops! Ocorreu um erro.
                    </Text>

                    <Text style={styles.message}>
                        {message || "Não foi possível concluir a ação."}
                    </Text>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={onClose}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>
                            Entendi
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.55)",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
    },

    container: {
        width: "100%",
        backgroundColor: "#0b1722",
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#28313d96",
        padding: 18,
        alignItems: "center",
        gap: 12,
    },

    title: {
        fontSize: 16,
        textAlign:"center",
        fontWeight: "700",
        color: "#FFFFFF",
    },

    message: {
        fontSize: 14,
        color: "#94A3B8",
        textAlign: "center",
        lineHeight: 20,
    },

    button: {
        marginTop: 8,
        backgroundColor: "#2563EB",
        paddingVertical: 10,
        paddingHorizontal: 28,
        borderRadius: 10,
    },

    buttonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "700",
    },
});
