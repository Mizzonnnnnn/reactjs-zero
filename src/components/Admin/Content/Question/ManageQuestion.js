import Select from 'react-select';
import './ManageQuestion.scss'
import { AiOutlineMinusCircle } from "react-icons/ai";
import { FiPlusCircle } from "react-icons/fi";
import { FiPlusSquare } from "react-icons/fi";
import { FiMinusSquare } from "react-icons/fi";

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const ManageQuestion = (props) => {
    return (
        <div className="questions-container">
            <div className="title">
                <b>Manage Questions</b>
            </div>

            <div className="add-new-question mt-3">
                <div className='col-6 form-group'>
                    Select Quiz
                    <Select
                        // value={selectedOption}
                        // onChange={this.handleChange}
                        options={options}
                    />
                </div>

                <div className='mt-3'>Add questions: </div>

                <div>

                    <div className='questions-content' >
                        <div className="form-floating description">
                            <input type="text" className="form-control" id="floatingInput" placeholder="description" />
                            <label htmlFor="floatingInput">Description</label>
                        </div>
                        <div className='group-upload'>
                            <label className='uploadFile'>Upload Image </label>
                            <input type={'file'} hidden />

                        </div>
                        <div className='icon'>
                            <span className='icon-add'><FiPlusCircle /></span>
                            <span className='icon-remove'><AiOutlineMinusCircle /></span>
                        </div>
                    </div>
                    <div className="answer-content" >
                        <input
                            className="form-check-input iscorrect"
                            type="checkbox"
                        />
                        <div className="form-floating answer-name ">
                            <input type="text" className="form-control" id="floatingInput" placeholder="description" />
                            <label htmlFor="floatingInput">Answer 1</label>
                        </div>
                        <div className='btn-group'>
                            <span className='icon-add'><FiPlusSquare /></span>
                            <span className='icon-remove'><FiMinusSquare /></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default ManageQuestion;