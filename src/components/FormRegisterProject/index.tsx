
import Modal from '../Modal';
const FromRegisterProject = () => {
    return (
        <Modal id='modal-register-project'>
            <form >
                <label htmlFor='name'>Name</label>
                <input type='text' id='name' name='name' />
                <label htmlFor='description'>Description</label>
                <input type='text' id='description' name='description' />
                <label htmlFor='url'>URL</label>
                <input type='url' id='url' name='url' />
                <label htmlFor='image'>Image</label>
                <input type='file' id='image' name='image' />
                <button type='submit'>Submit</button>
            </form>
        </Modal>
    );
}

export default FromRegisterProject;