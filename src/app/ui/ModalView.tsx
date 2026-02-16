import { useState } from "react";
import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import IModalData from "../../features/interfaces/modal/IModalData";
import { textColor } from "../../features/values/colors";
import { ButtonTypes, FirmButton } from "../../features/ui/button/FirmButton";

export default function ModalView({modalData, setModalData}:{
    modalData:IModalData|null, 
    setModalData: React.Dispatch<React.SetStateAction<IModalData | null>>}) {
    
    return <Modal
        animationType="slide"
        transparent={true}
        visible={modalData != null}
        onRequestClose={() => setModalData(null)}>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                
                <Pressable
                    style={styles.buttonClose}
                    onPress={() => setModalData(null)}>
                        <Text style={styles.buttonCloseText}>×</Text>
                </Pressable>

                <Text style={styles.modalTitle}>{modalData?.title}</Text>
                <Text style={styles.modalText}>{modalData?.message}</Text>
                {modalData && (modalData.buttons?.length ?? 0) > 0 &&
                    <View style={styles.buttonsRow}>
                        {modalData.buttons!.map((b,i) => 
                            <FirmButton
                              key={i} 
                              buttonType={b.buttonType} 
                              title={b.title} 
                              action={() => {
                                if(b.action) {
                                  b.action();
                                }
                                setModalData(null);
                              } }/>)}
                        
                    </View>
                }
                
            </View>
        </View>
    </Modal>;
}


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonsRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5.0,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#373737',
    borderRadius: 7,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  }, 
  buttonClose: {
    position: "absolute",
    right: 10.0,
    top: 2.0,
  },
  buttonCloseText: {
    color: "maroon",
    fontSize: 28.0,
    fontWeight: 700,
  },
  modalTitle: {
    marginBottom: 10,
    textAlign: 'center',
    color: textColor,
    fontWeight: 600,
  },
  modalText: {
    marginBottom: 20.0,
    textAlign: 'center',
    color: textColor
  },
});