const Form = ({ newName, phone, handleSubmit, handleNoteChange, handlePhoneChange}) => {

    return (
      <form onSubmit={handleSubmit}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNoteChange}
          />
        </div>
        <div>
          number: <input 
          value={phone}
          onChange={handlePhoneChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default Form